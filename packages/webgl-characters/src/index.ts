import Cow from './cow'
import { InputControls } from './cow/controller/components/input-controls'
import Update from './cow/controller/components/update'

const Player = {
    Character: Cow,
    Controls: InputControls,
    Update
}

export { Player }