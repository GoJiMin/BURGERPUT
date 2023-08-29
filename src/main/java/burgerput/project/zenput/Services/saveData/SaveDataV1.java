package burgerput.project.zenput.Services.saveData;

import burgerput.project.zenput.Services.loadData.zenputLoading.FoodLoadingZenput;
import burgerput.project.zenput.Services.loadData.zenputLoading.MachineLoadingZenput;
import burgerput.project.zenput.domain.CustomFood;
import burgerput.project.zenput.domain.CustomMachine;
import burgerput.project.zenput.domain.Food;
import burgerput.project.zenput.domain.Machine;
import burgerput.project.zenput.repository.foodRepository.CustomFoodRepository;
import burgerput.project.zenput.repository.foodRepository.FoodRepository;
import burgerput.project.zenput.repository.machineRepository.CustomMachineRepository;
import burgerput.project.zenput.repository.machineRepository.MachineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Map;


@Slf4j
@RequiredArgsConstructor
public class SaveDataV1 implements SaveData {
    private final MachineLoadingZenput machineLoadingZenput;
    private final MachineRepository machineRepository;
    private final FoodLoadingZenput foodLoadingZenput;
    private final FoodRepository foodRepository;
    private final CustomFoodRepository customFoodRepository;
    private final CustomMachineRepository customMachineRepository;

    //Zenput Page Food Machine Loading and
    //save data to Database
    @Override
    public Map<Integer, Machine> machinezenputdatasave(Map<Integer, Machine> machineInfo) {
        //임시로 다지우고 시작 -> 변경해야하는 로직
        machineRepository.deleteAll();
        machineRepository.initIncrement();

        for (Integer key : machineInfo.keySet()) {
            Machine machine = machineInfo.get(key);

            machineRepository.save(machine);
        }
        return machineInfo;
    }

    @Override
    public Map<Integer, Food> foodZenputDataSave( Map<Integer, Food> foodinfo) {
        //임시로 다지우고 시작 -> 변경해야하는 로직
        foodRepository.deleteAll();
        foodRepository.initIncrement();
        for (Integer key : foodinfo.keySet()) {
            Food food = foodinfo.get(key);

            foodRepository.save(food);
        }
        return foodinfo;
    }

    @Override
    public void customMachineDataSave(ArrayList<Map> param) {
        //table의 내용을 전부 지웠다가 다시 저장 -> 달라진 내용만 업데이트 하는 방향 필요
        customMachineRepository.deleteAll();
        // num 변수 재 설정
        customMachineRepository.initIncrement();
        for (Map<String, String> map : param) {
            CustomMachine selectedMachine = new CustomMachine();
            selectedMachine.setId(Integer.parseInt(map.get("id")));
            //log.info("what is id={},", map.get("id"));

            customMachineRepository.save(selectedMachine);

        }
    }


    @Override
    public void customFoodDataSave(ArrayList<Map> param) {
        //임시로 다지우고 시작 -> 변경해야하는 로직
        customFoodRepository.deleteAll();
        customFoodRepository.initIncrement();

        for (Map<String, String> map : param) {
            CustomFood selectedFood = new CustomFood();
            selectedFood.setId(Integer.parseInt(map.get("id")));

            customFoodRepository.save(selectedFood);
        }
    }
}
