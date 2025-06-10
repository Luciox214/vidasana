package vidasana.tpo.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Service
public class SessionService {
    @Autowired
    private StringRedisTemplate redisTemplate;

    public void saveSession(String token, String userId, String role, String email) {
        String value = String.format("{\"userId\":\"%s\",\"role\":\"%s\",\"email\":\"%s\",\"loginTime\":\"%s\"}",
                userId, role, email, LocalDateTime.now());
        redisTemplate.opsForValue().set("session:" + token, value, 1, TimeUnit.HOURS);
    }

    public String getSession(String token) {
        return redisTemplate.opsForValue().get("session:" + token);
    }

    public void deleteSession(String token) {
        redisTemplate.delete("session:" + token);
    }
}
