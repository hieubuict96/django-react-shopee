import time
import jwt

class Jwt:
    def create_token(id, time_expire_in_second):
        now = time.time()
        token = jwt.encode({"id": id, "expire": now + time_expire_in_second}, "secret", algorithm="HS256")
        return token
        
    def verify_token(token):
        info = jwt.decode(token, "secret", algorithms=["HS256"])
        now = time.time()
        
        if now > info['expire']:
            raise Exception("token has expired")
        else:
            return {"id": info["id"]}