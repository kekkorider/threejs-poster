import { mul, cos, Fn, TWO_PI } from 'three/tsl';

export const palette = /*@__PURE__*/ Fn( ( [ t, a, b, c, d ] ) => {

	return a.add( b.mul( cos( mul( TWO_PI, c.mul( t ).add( d ) ) ) ) );

}, { t: 'float', a: 'vec3', b: 'vec3', c: 'vec3', d: 'vec3', return: 'vec3' } );
