package burgerput.project.zenput.Services.saveData;

import burgerput.project.zenput.domain.Food;
import burgerput.project.zenput.domain.Machine;

import java.util.ArrayList;
import java.util.Map;

public interface SaveData {
    public Map<Integer, Machine> macihneZenputDataSave(Map<Integer, Machine> machineInfo);

    public Map<Integer, Food> foodZenputDataSave(Map<Integer, Food> foodinfo);

    public void customMachineDataSave(ArrayList<Map> param);

    public void customFoodDataSave(ArrayList<Map> param);
}
