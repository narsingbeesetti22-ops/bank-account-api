%dw 2.0
import * from dw::test::Asserts
---
payload must equalTo({
  "message": "Account created successfully",
  "accountNumber": "8569746539"
})