import {IFrame} from "./frame";
import {cannotCalculateBonusError} from "./errors";

export class Scorecard {
    private frames: IFrame[] = []
    private totalScore = 0

    getTotalScore = () => {
        return this.totalScore
    }

    addFrame = (frame: IFrame) => {
        this.frames.push(frame)
    }

    getFrames = () => {
        return this.frames
    }

    calculateFrameScore = (frame: IFrame) => {
        return frame.rolls.reduce((a, b) => { return a + b });
    }

    calculateBonusScore = (frameNumber: number) => {
        if (frameNumber == 0) { throw cannotCalculateBonusError }
        const previousFrame = this.frames[frameNumber - 1]
        const frame = this.frames[frameNumber]
        if (previousFrame.isStrike() && !frame.isStrike()) {
            return frame.getTotalFrameScore()
        }

        if (previousFrame.isSpare()) {
            return frame.rolls[0]
        }
    }
}