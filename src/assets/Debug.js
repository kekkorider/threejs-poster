import { Pane } from 'tweakpane'

import {
  divisions,
  circleSize,
  grainIntensity,
  colorA,
  colorB,
  colorC,
  colorD
} from '@/assets/materials/PlaneMaterial'

const pane = new Pane({
  container: document.getElementById('tweakpane-container'),
})

pane.addBinding(
  grainIntensity,
  'value',
  {
    label: 'Grain intensity',
    min: 0,
    max: 10,
    step: 0.001
  }
)

pane.addBinding(
  colorA,
  'value',
  {
    label: 'Color A',
    color: {
      type: 'float'
    }
  }
)

pane.addBinding(
  colorB,
  'value',
  {
    label: 'Color B',
    color: {
      type: 'float'
    }
  }
)

pane.addBinding(
  colorC,
  'value',
  {
    label: 'Color C',
    color: {
      type: 'float'
    }
  }
)

pane.addBinding(
  colorD,
  'value',
  {
    label: 'Color D',
    color: {
      type: 'float'
    }
  }
)

// pane.addBinding(
//   divisions,
//   'value',
//   {
//     label: 'Divisions',
//     min: 3,
//     max: 10,
//     step: 1
//   }
// )

// pane.addBinding(
//   circleSize,
//   'value',
//   {
//     label: 'Circle size',
//     min: 0.05,
//     max: 0.4,
//     step: 0.001
//   }
// )
