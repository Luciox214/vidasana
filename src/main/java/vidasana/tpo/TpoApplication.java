package vidasana.tpo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class TpoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TpoApplication.class, args);
	}

}
