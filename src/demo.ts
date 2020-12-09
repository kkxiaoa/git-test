class Super {
  private name = 'super';

  say() {
    console.log(this.name);
  }
}

class Sub extends Super {
  age = 12;
  introduce() {
    this.say();
    console.log(this.age);
  }
}
