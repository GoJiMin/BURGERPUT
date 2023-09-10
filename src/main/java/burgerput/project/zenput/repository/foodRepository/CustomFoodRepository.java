package burgerput.project.zenput.repository.foodRepository;

import burgerput.project.zenput.domain.CustomFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CustomFoodRepository extends JpaRepository<CustomFood, Integer> {
    @Modifying
    @Query(value = "truncate table Custom_food", nativeQuery = true)
    public void deleteAll();

    @Modifying
    @Query(value = "alter table Custom_food auto_increment=1", nativeQuery = true)
    public void initIncrement();


    @Modifying(clearAutomatically = true)
    @Query(value = "delete from custom_food where id = :id", nativeQuery = true)
    public void deleteBymineId(@Param("id") String id);


}
