var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var res = generateMessage(from, text);

        expect(res.createdAt).toBeDefined();
        expect(res).toInclude({
            from,
            text
        });
    });
});
