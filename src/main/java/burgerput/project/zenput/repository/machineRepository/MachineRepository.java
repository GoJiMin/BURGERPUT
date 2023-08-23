package burgerput.project.zenput.repository.machineRepository;

import burgerput.project.zenput.domain.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface MachineRepository extends JpaRepository<Machine, Integer> {
    @Modifying//insert update delete를 사용할 떄 써줄 것
    @Query(value="truncate table machine",  nativeQuery = true)
    public void deleteAll();

    @Modifying
    @Query(value = "alter table machine auto_increment=1", nativeQuery = true)
    public void initIncrement();
}