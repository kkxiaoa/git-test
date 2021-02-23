class Super {
  private name = 'super';

  say() {
    console.log(this.name, 12);
  }
}

class Sub extends Super {
  age = 12;
  introduce() {
    this.say();
    console.log(this.age);
  }
}
