%dw 2.0
import * from dw::test::Asserts
---
payload must equalTo({
  "message": "Account not found",
  "accountNumber": null
})