package vidasana.tpo.pacientes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidasana.tpo.enums.Rol;
import vidasana.tpo.exceptions.BadRequestException;
import vidasana.tpo.pacientes.model.Paciente;
import vidasana.tpo.pacientes.repository.PacienteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public Paciente crear(Paciente request) {
        if (pacienteRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email ya registrado.");
        }

        if (pacienteRepository.findByDni(request.getDni()).isPresent()) {
            throw new BadRequestException("DNI ya registrado.");
        }

        request.setRol(Rol.PACIENTE);
        return pacienteRepository.save(request);
    }

    public List<Paciente> obtenerTodos() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> obtenerPorId(String id) {
        return pacienteRepository.findById(id);
    }

    public void actualizarPaciente(Paciente paciente) {
        pacienteRepository.save(paciente);
    }
}
