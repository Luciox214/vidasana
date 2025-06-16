package vidasana.tpo.risk.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import vidasana.tpo.risk.model.RiskScore;
import java.util.List;
import java.util.Optional;

public interface RiskRepository extends MongoRepository<RiskScore, String> {

    @Query("{'pacienteId': ?0}")
    Optional<RiskScore> findByPacienteId(String pacienteId);

    @Query("{'nivelRiesgo': 'ALTO'}")
    List<RiskScore> findHighRiskPatients();
}