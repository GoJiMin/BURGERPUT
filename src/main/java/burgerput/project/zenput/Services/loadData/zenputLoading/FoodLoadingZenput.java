package burgerput.project.zenput.Services.loadData.zenputLoading;

import burgerput.project.zenput.domain.Food;
import burgerput.project.zenput.domain.Machine;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.Map;

public interface FoodLoadingZenput {
    public Food extractIdTitle(WebElement field);

    public  Map<Integer, Food> getInfo();

}
