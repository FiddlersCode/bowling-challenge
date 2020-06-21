import {Scorecard} from "../src/scorecard"

describe('Scorecard', () => {
    let scorecard: Scorecard;
    beforeEach(() => {
        scorecard = new Scorecard();
    })
    it('ss100.T210: starts with 10 empty frames', async () => {
        expect(scorecard.frames.length).toEqual(10);
    });
});
