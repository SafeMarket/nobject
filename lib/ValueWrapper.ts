export * from ValueWrapper;

class ValueWrapper {
  value: any;
  constructor(_value: any) {
    value = _value;
  }
  public toJSON () {
    return this.value;
  }
}
