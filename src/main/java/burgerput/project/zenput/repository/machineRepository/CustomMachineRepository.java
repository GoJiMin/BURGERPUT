package burgerput.project.zenput.repository.machineRepository;

import burgerput.project.zenput.domain.CustomMachine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface CustomMachineRepository extends JpaRepository<CustomMachine,Integer> {
    @Modifying
    @Query(value="truncate table Custom_machine",  nativeQuery = true)
    public void deleteAll();

    @Modifying
    @Query(value = "alter table Custom_machine auto_increment=1", nativeQuery = true)
    public void initIncrement();
}
