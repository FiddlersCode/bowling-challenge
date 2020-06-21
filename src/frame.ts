import {scoreRangeError, secondRollOnStrikeErrorMessage} from "./errors";

export class Frame {
    private rolls: number[] = [0, 0]
    private minScore: number = 0
    private maxScore: number = 10
    getRolls = () => { return this.rolls }

    setRolls = (first: number, second: number) => {
        if (this.scoresOutOfRange(first, second)) {
            throw scoreRangeError
        }
        if (first == this.maxScore && second != this.minScore) {
            throw secondRollOnStrikeErrorMessage
        }
        return this.rolls = [first, second]
    }
    isStrike = () => { return this.rolls[0] == this.maxScore }

    isSpare = () => { return this.getTotalFrameScore() == this.maxScore }

    private getTotalFrameScore() {
        return this.rolls.reduce((a, b) => { return a + b });
    }

    private scoresOutOfRange = (first, second): Boolean => {
        return (
            first > this.maxScore ||
            first < this.minScore ||
            second > this.maxScore ||
            second < this.minScore
        )
    }
}