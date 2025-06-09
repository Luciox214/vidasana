package vidasana.tpo.pacientes.repository;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import vidasana.tpo.pacientes.model.Paciente;

import java.util.Optional;

public interface PacienteRepository extends MongoRepository<Paciente, String> {
    Optional<Object> findByEmail(String email);

    Optional<Object> findByDni(@NotNull(message = "El DNI no puede ser nulo") String dni);
}
