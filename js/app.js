const 文件 = document;
const 百 = 100;
const 千 = 1000;
const 万 = 10000;
const 值 = "value";
const 最小 = "min";
const 最大 = "max";
const 间隔 = "step";
const 输入 = "input";
const 点击 = "click";
const 获益颜色 = "red";
const 亏损颜色 = "green";
const 卖出价格背景颜色 = "gold";
const 券商佣金 = 2.5 / 万;
const 证管费 = 2 / (万*10);
const 经手费 = 3.41 / (万*10);
const 过户费 = 1 / (万*10);
const 证券交易税税率 = 0.05 / 百; //印花税
const 指数股票型基金证券交易税税率 = 0.1 / 百;
const 默认模式 = "详细";
const 默认最低手续费 = 5;
const 默认手续费折扣 = 1;
const 默认报价档数 = 5;

const 记住 = (名字, 内容) => localStorage.setItem(名字, 内容);
const 想起 = (名字, 默认) => localStorage.getItem(名字) || 默认;
const 忘记 = (名字) => localStorage.removeItem(名字);
const 显示 = (节点) => (节点.hidden = false);
const 隐藏 = (节点) => (节点.hidden = true);
const 渲染 = (节点, 内容) => (节点.innerHTML = 内容);
const 取得节点 = (名字) => 文件.getElementById(名字);
const 取得相同类别节点 = (名字) => 文件.getElementsByClassName(名字);
const 取得数值 = (字串) => Number(字串);
const 取得整数 = (数值) => Math.round(数值);
const 取得属性 = (节点, 标签) => 节点[标签];
const 注册事件 = (节点, 事件, 函数) => 节点.addEventListener(事件, 函数);

class 计算器 {
  constructor() {
    this.回填数据();
    this.注册事件();
  }

  get 交易类别字段() {
    return 取得节点("交易类别");
  }

  get 买入价格字段() {
    return 取得节点("买入价格");
  }

  get 卖出价格字段() {
    return 取得节点("卖出价格");
  }

  get 交易股数字段() {
    return 取得节点("交易股数");
  }

  get 模式字段() {
    return 取得节点("模式");
  }

  get 最低手续费字段() {
    return 取得节点("最低手续费");
  }

  get 手续费折扣字段() {
    return 取得节点("手续费折扣");
  }

  get 报价档数字段() {
    return 取得节点("报价档数");
  }

  get 表格节点() {
    return 取得节点("表格");
  }

  get 报价节点() {
    return 取得节点("报价");
  }

  get 网址() {
    return 取得节点("网址");
  }

  get 复制网址按钮() {
    return 取得节点("复制网址");
  }

  get 交易类别() {
    return 取得属性(this.交易类别字段, 值);
  }

  get 买入价格() {
    const 买入价格 = this.取得字段数值("买入价格字段");

    return this.买入价格合理(买入价格) ? 买入价格 : 0;
  }

  get 卖出价格() {
    const 卖出价格 = this.取得字段数值("卖出价格字段");

    return this.卖出价格合理(卖出价格) ? 卖出价格 : 0;
  }

  get 交易股数() {
    const 交易股数 = this.取得字段数值("交易股数字段");

    return this.交易股数合理(交易股数) ? 交易股数 : 0;
  }

  get 模式() {
    return 取得属性(this.模式字段, 值);
  }

  get 详细模式() {
    return this.模式 === "详细";
  }

  get 简易模式() {
    return this.模式 === "简易";
  }

  get 最低手续费() {
    const 最低手续费 = this.取得字段数值("最低手续费字段");

    return this.最低手续费合理(最低手续费) ? 最低手续费 : 默认最低手续费;
  }

  get 手续费折扣() {
    const 手续费折扣 = this.取得字段数值("手续费折扣字段");

    return this.手续费折扣合理(手续费折扣) ? 手续费折扣 : 默认手续费折扣;
  }

  get 报价档数() {
    const 报价档数 = this.取得字段数值("报价档数字段");

    return this.报价档数合理(报价档数) ? 报价档数 : 默认报价档数;
  }

  get 偏移列表() {
    const 报价档数 = this.报价档数;

    return [...Array(报价档数 * 2 + 1).keys()].map((v) => v - 报价档数);
  }

  get 完成表单() {
    return (
      this.买入价格 > 0 &&
      this.卖出价格 > 0 &&
      this.交易股数 > 0 &&
      this.手续费折扣 > 0
    );
  }

  格式化(数值) {
    return 取得数值(数值.toFixed(2)).toLocaleString();
  }

  修正间隔(字段, 升降单位) {
    字段[间隔] = 升降单位;
  }

  精算手续费(手续费) {
    return 取得整数(手续费 < this.最低手续费 ? this.最低手续费 : 手续费);
  }

  精算证券交易税税率(交易类别) {
    switch (true) {
      case 交易类别 === "ETF":
        return 指数股票型基金证券交易税税率;
      default:
        return 证券交易税税率;
    }
  }

  取得字段数值(字段, 属性 = 值) {
    return 取得数值(取得属性(this[字段], 属性));
  }

  取得卖出价格背景颜色(偏移) {
    return 偏移 === 0 && this.报价档数 > 0 ? 卖出价格背景颜色 : "";
  }

  取得损益金额颜色(损益金额) {
    return 损益金额 < 0 ? 亏损颜色 : 获益颜色;
  }

  回填数据() {
    this.模式字段[值] = 想起("模式", 默认模式);
    this.最低手续费字段[值] = 想起("最低手续费", 默认最低手续费);
    this.手续费折扣字段[值] = 想起("手续费折扣", 默认手续费折扣);
    this.报价档数字段[值] = 想起("报价档数", 默认报价档数);
  }

  注册事件() {
    注册事件(this.交易类别字段, 输入, () => {
      this.修正间隔(this.买入价格字段, this.换算档位(this.买入价格));
      this.修正间隔(this.卖出价格字段, this.换算档位(this.卖出价格));
    });

    注册事件(this.买入价格字段, 输入, () => {
      this.修正间隔(this.买入价格字段, this.换算档位(this.买入价格));
    });

    注册事件(this.卖出价格字段, 输入, () => {
      this.修正间隔(this.卖出价格字段, this.换算档位(this.卖出价格));
    });

    注册事件(this.交易股数字段, 输入, () => {
      this.修正间隔(this.交易股数字段, this.换算交易股数升降单位(this.交易股数));
    });

    注册事件(this.模式字段, 输入, (event) => {
      const 模式 = event.target[值];

      记住("模式", 模式);

      this.处理显示模式();
    });

    注册事件(this.最低手续费字段, 输入, (event) => {
      const 最低手续费 = 取得数值(event.target[值]);

      this.最低手续费合理(最低手续费) ? 记住("最低手续费", 最低手续费) : 忘记("最低手续费");
    });

    注册事件(this.手续费折扣字段, 输入, (event) => {
      const 手续费折扣 = 取得数值(event.target[值]);

      this.手续费折扣合理(手续费折扣) ? 记住("手续费折扣", 手续费折扣) : 忘记("手续费折扣");
    });

    注册事件(this.报价档数字段, 输入, (event) => {
      const 报价档数 = 取得数值(event.target[值]);

      this.报价档数合理(报价档数) ? 记住("报价档数", 报价档数) : 忘记("报价档数");
    });

    注册事件(文件, 输入, () => {
      this.处理报价();
    });

    注册事件(this.复制网址按钮, 点击, async () => {
      try {
        await navigator.clipboard.writeText(this.网址[值]);
      } catch (e) {
        //
      }
      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            text: '与你分享好用的股票交易计算器',
            url: document.location.href,
          });
        } catch (e) {
          //
        }
      }
      $("#modal-share").modal("hide");
    });
  }

  换算档位(价格) {
    if (this.交易类别 === "ETF") {
      return 价格 < 50 ? 0.01 : 0.05;
    }

    switch (true) {
      case 价格 < 10:
        return 0.01;
      case 价格 >= 10 && 价格 < 50:
        return 0.05;
      case 价格 >= 50 && 价格 < 100:
        return 0.1;
      case 价格 >= 100 && 价格 < 500:
        return 0.5;
      case 价格 >= 500 && 价格 < 1000:
        return 1;
      case 价格 >= 1000:
        return 5;
      default:
        break;
    }
  }

  换算交易股数升降单位(交易股数) {
    return 交易股数 % 千 === 0 ? 千 : 1;
  }

  处理显示模式() {
    Array.from(取得相同类别节点("详细字段")).forEach((节点) => {
      this.详细模式 ? 显示(节点) : 隐藏(节点);
    });
  }

  买入价格合理(买入价格) {
    return 买入价格 >= 1 && 买入价格 <= this.取得字段数值("买入价格字段", 最大);
  }

  卖出价格合理(卖出价格) {
    return 卖出价格 >= 1 && 卖出价格 <= this.取得字段数值("卖出价格字段", 最大);
  }

  交易股数合理(交易股数) {
    return 交易股数 >= 1 && 交易股数 <= this.取得字段数值("交易股数字段", 最大);
  }

  最低手续费合理(最低手续费) {
    return (
      最低手续费 >= this.取得字段数值("最低手续费字段", 最小) &&
      最低手续费 <= this.取得字段数值("最低手续费字段", 最大)
    );
  }

  手续费折扣合理(手续费折扣) {
    return (
      手续费折扣 >= this.取得字段数值("手续费折扣字段", 最小) &&
      手续费折扣 <= this.取得字段数值("手续费折扣字段", 最大)
    );
  }

  报价档数合理(报价档数) {
    return (
      报价档数 >= this.取得字段数值("报价档数字段", 最小) &&
      报价档数 <= this.取得字段数值("报价档数字段", 最大)
    );
  }

  处理报价() {
    if (!this.完成表单) {
      return 隐藏(this.表格节点);
    }

    const 报价 = this.偏移列表
      .map((初始偏移) => {
        const 成交价格档位 = 取得数值(this.卖出价格字段[间隔]);
        const 偏移 = (初始偏移 * 千 * 成交价格档位) / 千;
        const 成交价格 = this.卖出价格 + 偏移;
        const 成本 = this.买入价格 * this.交易股数;
        const 市值 = 成交价格 * this.交易股数;
        const 手续费费率 = 券商佣金 * this.手续费折扣;
        const 原始买入手续费 = 成本 * (手续费费率 + 证管费 + 经手费) ;
        const 原始卖出手续费 = 市值 * (手续费费率 + 证管费 + 经手费);
        const 买入过户费 = 成本 * 过户费;
        const 卖出过户费 = 市值 * 过户费;
        const 买入手续费 = this.精算手续费(原始买入手续费) + 买入过户费;
        const 卖出手续费 = this.精算手续费(原始卖出手续费) + 卖出过户费 ;
        const 印花税 = 取得整数(市值 * this.精算证券交易税税率(this.交易类别));
        const 成本总金额 = 成本 + 买入手续费;
        const 实收总金额 = 市值 - 卖出手续费 - 印花税;
        const 损益金额 = 实收总金额 - 成本总金额;
        const 收益率 = 损益金额 / 成本;
        const 卖出价格背景颜色 = this.取得卖出价格背景颜色(偏移);
        const 损益金额颜色 = this.取得损益金额颜色(损益金额);
        const 原始买入手续费字样 = 取得整数(原始买入手续费 * 百) / 百 < this.最低手续费 ? `(${this.格式化(原始买入手续费)})` : "";
        const 原始卖出手续费字样 = 取得整数(原始卖出手续费 * 百) / 百 < this.最低手续费 ? `(${this.格式化(原始卖出手续费)})` : "";

        return `
          <tr class="text-center" style="background:${卖出价格背景颜色};">
            <td>
              ${this.格式化(成交价格)}
            </td>
            <td ${this.简易模式 && "hidden"}>
              ${this.格式化(成本总金额)}
            </td>
            <td ${this.简易模式 && "hidden"}>
              ${this.格式化(实收总金额)}
            </td>
            <td ${this.简易模式 && "hidden"}>
              ${this.格式化(买入手续费)} ${原始买入手续费字样}
            </td>
            <td ${this.简易模式 && "hidden"}>
              ${this.格式化(卖出手续费)} ${原始卖出手续费字样}
            </td>
            <td ${this.简易模式 && "hidden"}>
              ${this.格式化(印花税)}
            </td>
            <td style="color: ${损益金额颜色};">
              ${this.格式化(损益金额)}
            </td>
            <td style="color: ${损益金额颜色};">
              ${this.格式化(收益率 * 百)}%
            </td>
          </tr>
        `;
      })
      .join("");

    渲染(this.报价节点, 报价);
    显示(this.表格节点);

    this.处理显示模式();
  }
}

new 计算器().处理报价();

