package vidasana.tpo.red.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidasana.tpo.exceptions.BadRequestException;
import vidasana.tpo.medicos.model.MedicoNode;
import vidasana.tpo.medicos.repository.MedicoNodeRepository;
import vidasana.tpo.pacientes.model.PacienteNode;
import vidasana.tpo.pacientes.repository.PacienteNodeRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RedMedicaService {
    @Autowired
    MedicoNodeRepository medicoRepo;
    @Autowired
    PacienteNodeRepository pacienteRepo;


    public void crearRelacion(String idMedico, String idPaciente) {
        MedicoNode medico = medicoRepo.findById(idMedico)
                .orElseThrow(() -> new BadRequestException("Médico no encontrado"));
        PacienteNode paciente = pacienteRepo.findById(idPaciente)
                .orElseThrow(() -> new BadRequestException("Paciente no encontrado"));

        if (medico.getPacientes() == null) {
            medico.setPacientes(new HashSet<>());
        }

        medico.getPacientes().add(paciente);
        medicoRepo.save(medico); // esto guarda la relación en Neo4j
    }

    public Set<PacienteNode> listarPacientesDeMedico(String idMedico) {
        return medicoRepo.findById(idMedico)
                .orElseThrow(() -> new BadRequestException("Médico no encontrado"))
                .getPacientes();
    }
    public List<MedicoNode> obtenerMedicos() {
        return medicoRepo.findAll();

    }

}

