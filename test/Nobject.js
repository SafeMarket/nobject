const Nobject = require('../')
const expect = require('chai').expect

describe('Nobject', () => {
  
  let nobject 
  const values = ['my string', { myObject: true }, false, 3]

  it('should instatiate', () => {
    nobject = new Nobject
    expect(nobject).to.be.instanceOf(Nobject)
  })

  it('sould set and get correctly', () => {
    nobject.set([1, '2', 'three'], values[0])
    expect(nobject.get([1, '2', 'three'])).to.equal(values[0])
  })

  it('sould set and get correctly in similar namespace', () => {
    nobject.set(1, '2', 'threef', values[1])
    expect(nobject.get([1, '2', 'threef'])).to.equal(values[1])
  })

  it('sould set and get correctly with different dimensions', () => {
    const args = [2, 'b']
    nobject.set(args, values[2])
    expect(nobject.get(args)).to.equal(values[2])
  })

  it('sould set and get correctly in similar namespace', () => {
    const args = ['one', '2', 'threef']
    nobject.set(args, values[3])
    expect(nobject.get(args)).to.equal(values[3])
  })

  it('should return undefined when get dead ends', () => {
    const args = ['deadend', '2', 'threef']
    expect(nobject.get(args)).to.be.undefined
  })

  it('should forEach', () => {
    let i = 0
    nobject.forEach((keys, value) => {
      expect(nobject.get(keys)).to.equal(values[i])
      i ++
    })
    expect(i).to.equal(4)
  })

  it('should forEach and break after 2nd value', () => {
    let i = 0
    nobject.forEach((keys, value) => {
      if (value === values[2]) {
        return false
      }
      i ++
    })
    expect(i).to.equal(2)
  })

  it('should toJSON', () => {
    const json = '{"1":{"2":{"three":"my string","threef":{"myObject":true}}},"2":{"b":false},"one":{"2":{"threef":3}}}'
    expect(nobject.toJSON()).to.equal(json)
  })

  describe('readme examples', () => {

    it('should work', () => {

      const myNobject = new Nobject

      myNobject.set(['a', 'a', 'a'], 1)
      myNobject.set('a', 'a', 'b', 2)

      expect(myNobject.get('a', 'a', 'a')).to.equal(1)
      expect(myNobject.get(['a', 'a', 'b'])).to.equal(2)
      expect(myNobject.get('x', 'y')).to.be.undefined
      expect(myNobject.toJSON()).to.equal('{"a":{"a":{"a":1,"b":2}}}')

    })
  })

})