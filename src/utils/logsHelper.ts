class Logger {
  async logs(activityName = "", activityStatus = "") {
    try {
      const date = new Date();
      const data = { activityName, activityStatus, date };
      //   await postData("/logs", data);
    } catch (error) {
      console.error(error, "log error");
    }
  }
}

export class Activity {
  static call_us_popup_clicked = "call us popup clicked";
  static call_us_clicked = "calling sarthi";
  static signup_clicked = "signup";
  static signin_clicked = "signin";
}

export class Status {
  static success = "success";
  static failed = "failed";
}

export const logger = new Logger();
