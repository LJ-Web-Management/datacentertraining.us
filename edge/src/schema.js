// A small JSON Schema validator for the tool input schemas in
// /.well-known/mcp.json (Draft 7). Workers cannot run Ajv's generated code, and
// the schemas only use this subset: type, enum, const, string length and
// pattern, format "uri", numeric bounds, arrays, objects with required and
// additionalProperties, and anyOf. Errors are { path, message } with a JSON
// Pointer path, ready for a problem-details "errors" array.

function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  if (typeof v === 'number') return Number.isInteger(v) ? 'integer' : 'number';
  return typeof v;
}

function matchesType(v, t) {
  const actual = typeOf(v);
  return actual === t || (t === 'number' && actual === 'integer');
}

function pointer(path, key) {
  return path + '/' + String(key).replace(/~/g, '~0').replace(/\//g, '~1');
}

function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function validate(schema, value, path = '') {
  const errors = [];
  const err = (message) => errors.push({ path: path || '/', message });
  if (schema === true || schema === undefined) return errors;
  if (schema === false) return [{ path: path || '/', message: 'is not allowed' }];

  if (schema.type) {
    const types = [].concat(schema.type);
    if (!types.some((t) => matchesType(value, t))) {
      err('must be ' + types.join(' or ') + ', got ' + typeOf(value));
      return errors;
    }
  }
  if (schema.enum && !schema.enum.some((e) => equal(e, value))) err('must be one of: ' + schema.enum.map((e) => JSON.stringify(e)).join(', '));
  if ('const' in schema && !equal(schema.const, value)) err('must be ' + JSON.stringify(schema.const));

  if (typeof value === 'string') {
    const length = [...value].length;
    if (schema.minLength !== undefined && length < schema.minLength) err('must be at least ' + schema.minLength + ' characters');
    if (schema.maxLength !== undefined && length > schema.maxLength) err('must be at most ' + schema.maxLength + ' characters');
    if (schema.pattern && !new RegExp(schema.pattern, 'u').test(value)) err('must match pattern ' + schema.pattern);
    if (schema.format === 'uri' && !/^[a-z][a-z0-9+.-]*:/i.test(value)) err('must be an absolute URI');
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) err('must be >= ' + schema.minimum);
    if (schema.maximum !== undefined && value > schema.maximum) err('must be <= ' + schema.maximum);
    if (schema.exclusiveMinimum !== undefined && value <= schema.exclusiveMinimum) err('must be > ' + schema.exclusiveMinimum);
    if (schema.exclusiveMaximum !== undefined && value >= schema.exclusiveMaximum) err('must be < ' + schema.exclusiveMaximum);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) err('must have at least ' + schema.minItems + ' items');
    if (schema.maxItems !== undefined && value.length > schema.maxItems) err('must have at most ' + schema.maxItems + ' items');
    if (schema.uniqueItems && new Set(value.map((x) => JSON.stringify(x))).size !== value.length) err('must not contain duplicates');
    if (schema.items && typeof schema.items === 'object') value.forEach((item, i) => errors.push(...validate(schema.items, item, pointer(path, i))));
  }
  if (typeOf(value) === 'object') {
    const props = schema.properties || {};
    for (const key of schema.required || []) if (!(key in value)) errors.push({ path: pointer(path, key), message: 'is required' });
    for (const [key, v] of Object.entries(value)) {
      if (key in props) errors.push(...validate(props[key], v, pointer(path, key)));
      else if (schema.additionalProperties === false) errors.push({ path: pointer(path, key), message: 'is not a known field' });
      else if (typeof schema.additionalProperties === 'object') errors.push(...validate(schema.additionalProperties, v, pointer(path, key)));
    }
  }
  if (schema.allOf) for (const s of schema.allOf) errors.push(...validate(s, value, path));
  if (schema.anyOf && !schema.anyOf.some((s) => validate(s, value, path).length === 0)) {
    const options = schema.anyOf.map((s) => (s.required ? 'has ' + s.required.join(' and ') : 'matches option')).join(', or ');
    err('must satisfy one of: ' + options);
  }
  return errors;
}

// Query-string input (GET on a tool endpoint) arrives as strings; convert each
// field to the type its schema declares before validating.
export function coerceQuery(schema, params) {
  const out = {};
  const props = (schema && schema.properties) || {};
  for (const [key, raw] of params) {
    const s = props[key] || {};
    const t = [].concat(s.type || 'string')[0];
    const scalar = (v, type) => {
      if ((type === 'number' || type === 'integer') && v.trim() !== '' && !Number.isNaN(Number(v))) return Number(v);
      if (type === 'boolean' && (v === 'true' || v === 'false')) return v === 'true';
      return v;
    };
    if (t === 'array') {
      const itemType = [].concat((s.items && s.items.type) || 'string')[0];
      out[key] = (key in out ? out[key] : []).concat(raw.split(',').map((x) => x.trim()).filter(Boolean).map((x) => scalar(x, itemType)));
    } else {
      out[key] = scalar(raw, t);
    }
  }
  return out;
}
