package burgerput.project.zenput.repository.foodRepository;

import burgerput.project.zenput.domain.CustomMachine;
import burgerput.project.zenput.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface FoodRepository extends JpaRepository<Food,Integer> {
    @Modifying
    @Query(value="truncate table food",  nativeQuery = true)
    public void deleteAll();

    @Modifying
    @Query(value = "alter table food auto_increment=1", nativeQuery = true)
    public void initIncrement();
}

