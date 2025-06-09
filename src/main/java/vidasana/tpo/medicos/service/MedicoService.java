package vidasana.tpo.medicos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidasana.tpo.enums.Rol;
import vidasana.tpo.exceptions.BadRequestException;
import vidasana.tpo.medicos.model.Medico;
import vidasana.tpo.medicos.repository.MedicoRepository;
import vidasana.tpo.pacientes.model.Paciente;

import java.util.List;

@Service
public class MedicoService {
    @Autowired
    MedicoRepository medicoRepository;

    public Medico crear(Medico request) {
        if (medicoRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email ya registrado.");
        }
        request.setRol(Rol.MEDICO);
        return medicoRepository.save(request);
    }

    public List<Medico> obtenerTodos() {
        return medicoRepository.findAll();
    }
}
