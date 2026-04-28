export default (chai) =>
  chai.Assertion.addMethod('textTrimmed', function (expectedString: string) {
    const Assertion = chai.Assertion

    const $element = this._obj

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    new Assertion($element).to.be.exist

    const actual = $element.text().trim()
    const expected = expectedString.trim()
    this.assert(actual === expected, 'expected #{this} to have text #{exp}, but found #{act}', 'expected #{this} to not have text #{exp}', expected, actual)
  })
