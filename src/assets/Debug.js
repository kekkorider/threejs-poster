import { Pane } from 'tweakpane'

import {
  divisions,
  circleSize,
  grainIntensity
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
    max: 2,
    step: 0.001
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
