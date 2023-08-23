package burgerput.project.zenput.Services.loadData;

import burgerput.project.zenput.domain.Food;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Map;

@Slf4j
class FoodLoadingZenputV1Test {

    private FoodLoadingZenput food;

    @Test
    @DisplayName("LOADING FOOD DATA")
    public void loadingFood() {
        Map<Integer, Food> info = food.getInfo();

        for (Integer integer : info.keySet()) {

            log.info("data  ={}", info.get(integer));
        }

    }

    @Test
    @DisplayName("Sasve the Food to DB")
    public void saveFood() {
        Map<Integer, Food> info = food.getInfo();

    }
}