import {Scorecard} from "../src/scorecard"
import {Frame} from "../src/frame";

describe('Scorecard', () => {
    let scorecard: Scorecard;
    beforeEach(() => {
        scorecard = new Scorecard();
    })

    describe('addFrame()', () => {
        let i = 10;
        it(`ss200.T${i} adding a frame`, () => {
            const frame: Frame = new Frame()
            const rolls = [3, 3]
            frame.setRolls(rolls)
            scorecard.addFrame(frame.getRolls())
            expect(scorecard.getFrames()).toEqual([rolls])
        });
    })

    describe('calculateScore', () => {
        let i = 10;
        it(`ss200.T${i}calculates a score`, () => {
        });
    })
});
