package vidasana.tpo.red.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidasana.tpo.red.model.MedicoNode;
import vidasana.tpo.red.model.PacienteNode;
import vidasana.tpo.red.repositories.RedRepository;
import java.util.Set;
@Service
public class RedMedicaService {
    @Autowired
    private RedRepository redRepository;
    public Set<MedicoNode> listarMedicosDePaciente(String pacienteId) {
        Set<MedicoNode> medicos = redRepository.listarMedicosDePaciente(pacienteId);
        medicos.forEach(medico -> System.out.println("Medico: " + medico.getId() + ", Nombre: " + medico.getNombre()));
        return medicos;
    }
    public Set<PacienteNode> listarPacientesDeMedico(String medicoId) {
        return redRepository.listarPacientesDeMedico(medicoId);
    }
}
