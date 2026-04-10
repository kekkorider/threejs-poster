import { Pane } from 'tweakpane'

import {
  divisions,
  circleSize
} from '@/assets/materials/PlaneMaterial'

const pane = new Pane({
  container: document.getElementById('tweakpane-container'),
})

pane.addBinding(
  divisions,
  'value',
  {
    label: 'Divisions',
    min: 3,
    max: 10,
    step: 1
  }
)

pane.addBinding(
  circleSize,
  'value',
  {
    label: 'Circle size',
    min: 0.05,
    max: 0.4,
    step: 0.001
  }
)
