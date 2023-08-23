package burgerput.project.zenput.Services.saveData;

import java.util.ArrayList;
import java.util.Map;

public interface SaveData {
    public void macihneZenputDataSave();

    public void foodZenputDataSave();

    public void customMachineDataSave(ArrayList<Map> param);

    public void customFoodDataSave(ArrayList<Map> param);
}
