import {Scorecard} from "../src/scorecard";
import {Frame} from "../src/frame";

export const setFrame = (scorecard: Scorecard, rolls: number[]) => {
    const frame: Frame = new Frame()
    frame.setRolls(rolls)
    scorecard.addFrame(frame)
}