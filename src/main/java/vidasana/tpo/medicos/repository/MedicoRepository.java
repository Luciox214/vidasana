package vidasana.tpo.medicos.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vidasana.tpo.medicos.model.Medico;

import java.util.Optional;

@Repository
public interface MedicoRepository extends MongoRepository<Medico, String> {
    Optional<Object> findByEmail(String email);
}
