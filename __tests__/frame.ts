import {Frame} from "../src/frame"
import {scoreRangeError, secondRollOnStrikeErrorMessage} from "../src/errors";

describe(`Frame`, () => {
    let frame: Frame;
    beforeEach(() => {
        frame = new Frame();
    })

    describe(`getRolls()`, () => {
        let i = 10;
        it(`ss100.T${i}: has 2 rolls`, async () => {
            expect(frame.getRolls()).toEqual([0, 0]);
        });
    })

    describe(`setRolls()`, () => {
        let i = 10;
        it(`ss200.T${i}: throws an error when setting a 2nd roll after a strike`, async () => {
            expect(() => {
                frame.setRolls([10, 1]);
            }).toThrow(secondRollOnStrikeErrorMessage)
        });

        i += 10
        it(`ss200.T${i}: throws an error when one score is out of bounds`, async () => {
            expect(() => {
                frame.setRolls([-1, 9]);
            }).toThrow(scoreRangeError)
        });

        i += 10
        it(`ss200.T${i}: throws an error when one score is out of bounds`, async () => {
            expect(() => {
                frame.setRolls([9, -1]);
            }).toThrow(scoreRangeError)
        });

        i += 10
        it(`ss200.T${i}: throws an error when the scores are out of bounds`, async () => {
            expect(() => {
                frame.setRolls([11, -1]);
            }).toThrow(scoreRangeError)
        });

        i += 10
        it(`ss200.T${i}: throws an error when the scores are out of bounds`, async () => {
            expect(() => {
                frame.setRolls([-1, 11]);
            }).toThrow(scoreRangeError)
        });
    })

    describe(`isStrike()`, () => {
        let i = 10;
        it(`ss300.T${i}: not a strike`, async () => {
            frame.setRolls([9, 0]);
            expect(frame.isStrike()).toEqual(false);
        });

        i += 10
        it(`ss300.T${i}: a strike if the first roll scores 10`, async () => {
            frame.setRolls([10]);
            expect(frame.isStrike()).toEqual(true);
        });
    })

    describe(`isSpare()`, () => {
        let i = 10
        it(`ss400.T${i}: not a spare`, async () => {
            frame.setRolls([5, 9]);
            expect(frame.isSpare()).toEqual(false);
        });

        i += 10
        it(`ss400.T${i}: a spare if the total frame score is 10`, async () => {
            frame.setRolls([5, 5]);
            expect(frame.isSpare()).toEqual(true);
        });
    })
});
