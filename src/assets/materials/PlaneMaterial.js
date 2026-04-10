import {
  uv,
  Fn,
  uniform,
  length,
  vec2,
  fract,
  div,
  mul
} from 'three/tsl'
import { MeshBasicNodeMaterial } from 'three/webgpu'

export const divisions = uniform(10)
export const circleSize = uniform(0.2)

export const PlaneMaterial = new MeshBasicNodeMaterial()
PlaneMaterial.name = 'PlaneMaterial'

const Circle = Fn(([p, size, coords]) => {
  const st = coords.toVar()
  const ratio = 0.8
  st.x.mulAssign(ratio)
  st.y.mulAssign(divisions)
  return length(st.sub(p.mul(vec2(ratio, mul(1, divisions))))).step(size).oneMinus()
})

const Grid = Fn(() => {
  const st = uv().toVar()
  st.x.assign(fract(st.x.mul(divisions)))

  return st
})

PlaneMaterial.colorNode = Fn(() => {
  const gridUV = Grid()
  const circle = Circle(vec2(0.5, 0.5), circleSize, gridUV)

  return circle
})()
