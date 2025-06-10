package vidasana.tpo.habitos.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vidasana.tpo.habitos.model.HabitoDiario;

import java.util.List;

@Repository
public interface HabitoDiarioRepository extends MongoRepository<HabitoDiario, String> {
    List<HabitoDiario> findByPacienteIdOrderByFechaDesc(String pacienteId);
}
