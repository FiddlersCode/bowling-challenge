import {Frame} from "../src/frame"
import {scoreRangeError, secondRollOnStrikeErrorMessage} from "../src/errors";

describe('Frame', () => {
    let frame: Frame;
    beforeEach(() => {
        frame = new Frame();
    })

    describe('getRolls()', () => {
        it('ss100.T10: has 2 rolls', async () => {
            expect(frame.getRolls()).toEqual([0, 0]);
        });
    })

    describe('setRolls()', () => {
        it('ss200.T10: throws an error when setting a 2nd roll after a strike', async () => {
            expect(() => {
                frame.setRolls(10, 1);
            }).toThrow(secondRollOnStrikeErrorMessage)
        });

        it('ss200.T20: throws an error when the scores are out of bounds', async () => {
            expect(() => {
                frame.setRolls(11, -1);
            }).toThrow(scoreRangeError)
        });

        it('ss200.T30: throws an error when the scores are out of bounds', async () => {
            expect(() => {
                frame.setRolls(-1, 11);
            }).toThrow(scoreRangeError)
        });
    })

    describe('isStrike()', () => {
        it('ss300.T10: not a strike', async () => {
            frame.setRolls(9, 0);
            expect(frame.isStrike()).toEqual(false);
        });

        it('ss300.T20: a strike if the first roll scores 10', async () => {
            frame.setRolls(10, 0);
            expect(frame.isStrike()).toEqual(true);
        });
    })

    describe('isSpare()', () => {
        it('ss400.T10: not a spare', async () => {
            frame.setRolls(5, 9);
            expect(frame.isSpare()).toEqual(false);
        });

        it('ss400.T20: a spare if the total frame score is 10', async () => {
            frame.setRolls(5, 5);
            expect(frame.isSpare()).toEqual(true);
        });
    })
});
