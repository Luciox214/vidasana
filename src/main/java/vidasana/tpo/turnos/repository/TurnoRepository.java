package vidasana.tpo.turnos.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vidasana.tpo.turnos.model.Turno;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TurnoRepository extends MongoRepository<Turno, String> {
    List<Turno> findByPacienteId(String pacienteId);
    List<Turno> findByMedicoId(String medicoId);
    List<Turno> findByFechaBetween(LocalDateTime desde, LocalDateTime hasta);
}
