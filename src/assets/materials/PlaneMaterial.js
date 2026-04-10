import {
  uv,
  Fn,
  uniform,
  length,
  vec2,
  fract,
  sub,
  mul,
  select,
  time,
  hash,
  smoothstep,
  color,
  texture
} from 'three/tsl'
import { MeshBasicNodeMaterial, DataTexture } from 'three/webgpu'
import { film } from 'three/addons/tsl/display/FilmNode.js'

import { palette } from '@/assets/tsl-utils'

const dummyTexture = new DataTexture(
  new Uint8Array(1, 0, 0, 1),
  1,
  1
)

export const divisions = uniform(9)
export const circleSize = uniform(0.4)
export const colorA = uniform(color(0.75, 0.51, 0.29))
export const colorB = uniform(color(0.11, 0.57, 0.59))
export const colorC = uniform(color(0.43, 0.24, 0.86))
export const colorD = uniform(color(0.71, 0.45, 0.11))
export const grainIntensity = uniform(1.5)
export const maskTexture = uniform(dummyTexture)

export const PlaneMaterial = new MeshBasicNodeMaterial()
PlaneMaterial.name = 'PlaneMaterial'

const Circle = Fn(([p, size, coords]) => {
  const st = coords.toVar()
  const ratio = 0.8
  st.x.mulAssign(ratio)
  st.y.mulAssign(divisions)

  return length(st.sub(p.mul(vec2(ratio, mul(1, divisions))))).step(size).oneMinus()
})

const RandomInRange = Fn(([seed, minVal, maxVal]) => {
  return hash(seed.mul(387242)).mul(sub(maxVal, minVal)).add(minVal)
})

const Grid = Fn(() => {
  const st = uv().toVar()
  st.x.assign(fract(st.x.mul(divisions)))

  const id = uv().x.mul(divisions).floor()

  const rnd = RandomInRange(id, 0.2, 0.4)
  const flipY = RandomInRange(id, 0, 1).greaterThanEqual(0.48)

  st.assign(
    select(
      flipY,
      st,
      vec2(st.x, st.y.oneMinus())
    )
  )

  st.y.subAssign(time.add(id).mul(rnd))
  st.fractAssign()

  return st
})

const Mask = Fn(() => {
  const grid = Grid()
  const circle = Circle(vec2(0.5, 0.5), circleSize, grid)
  const trail = Trail(vec2(0, 0.5), circleSize, grid)

  const mask = circle.add(trail)
  mask.clampAssign(0, 1)

  return mask
})

const Trail = Fn(([p, size, coords]) => {
  const st = coords.toVar()
  st.fractAssign()

  return smoothstep(0.25, 0.9, st.y.add(p.y).fract())
})

PlaneMaterial.colorNode = Fn(() => {
  const mask = Mask()

  const paletteUV = uv().x.mul(divisions).floor().div(divisions)
  const col = palette(paletteUV.x.add(time.mul(0.1)), colorA, colorB, colorC, colorD)

  col.mulAssign(mask)

  const tex0 = texture(maskTexture.value, uv())
col.subAssign(tex0.r)

  return film(col, grainIntensity, uv())
})()
