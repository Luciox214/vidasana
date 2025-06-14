package vidasana.tpo.red.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidasana.tpo.exceptions.BadRequestException;
import vidasana.tpo.red.model.MedicoNode;
import vidasana.tpo.red.repositories.MedicoNodeRepository;
import vidasana.tpo.red.model.PacienteNode;
import vidasana.tpo.red.repositories.PacienteNodeRepository;
import vidasana.tpo.red.repositories.RedRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Service
public class RedMedicaService {
    @Autowired
    private RedRepository redRepository;

    public Set<PacienteNode> listarPacientesDeMedico(String medicoId) {
        return redRepository.listarPacientesDeMedico(medicoId);
    }
}
