import "reflect-metadata";

const Autowired = (params: any = ""): Function => {
  return (target: any, propertyKey: string) => {
    // 获取该属性的类型
    let typeClass = Reflect.getMetadata("design:type", target, propertyKey);
    const descriptor = Reflect.getOwnPropertyDescriptor(
      target,
      propertyKey
    ) || {
      writable: true,
      configurable: true
    };
    // 实例化修饰类
    descriptor.value = params ? new typeClass(params) : new typeClass();
    Reflect.defineProperty(
      (target && target.prototype) || target,
      propertyKey,
      descriptor
    );
  };
};

const validate = () => {
  return (target: any, propertyKey: string) => {
    // 修饰目标对象的类型
    let type = Reflect.getMetadata("design:type", target, propertyKey);
    // 修饰目标的参数类型
    let paramTypes = Reflect.getMetadata(
      "design:paramtypes",
      target,
      propertyKey
    );
    // 修饰目标的返回值类型
    let returnType = Reflect.getMetadata(
      "design:returntype",
      target,
      propertyKey
    );

    // 所有能通过反射获取的元数据类型key
    let allKeys = Reflect.getMetadataKeys(target, propertyKey);
    console.log("type", type);
    console.log("paramTypes", paramTypes);
    console.log("returnType", returnType);
    console.log("allKeys", allKeys);
  };
};

const service = () => {
  return (target: any) => {
    Reflect.defineMetadata("ServiceDecorator", "your personal value", target);
  };
};

class UserService {
  getUserById(id: string) {
    return `user id is ${id}`;
  }
}

@service()
class Person {
  @Autowired()
  private userService: UserService;

  private name: string;

  @validate()
  getInfo(tags: string): string {
    return `your name is ${this.name}, tags is ${tags}`;
  }

  getUserInfo(id: string) {
    console.log(this.userService.getUserById(id));
  }
}

console.log(new Person().getUserInfo("12"));
