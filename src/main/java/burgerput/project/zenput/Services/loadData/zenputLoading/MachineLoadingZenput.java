package burgerput.project.zenput.Services.loadData.zenputLoading;

import burgerput.project.zenput.domain.Machine;
import org.openqa.selenium.WebElement;

import java.util.Map;

public interface MachineLoadingZenput {
    public Machine extractIdTitle(WebElement field);

    public Map<Integer,Machine> getInfo();

}