%dw 2.0
import * from dw::test::Asserts
---
payload must equalTo({
  "message": "Account already exists",
  "accountNumber": "8569746961",
  "adharNumber": "548699874886",
  "bankName": "AXIS"
})