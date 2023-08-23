package burgerput.project.zenput.Services.loadData.alertCheck;

import burgerput.project.zenput.Services.printData.PrintData;
import burgerput.project.zenput.domain.CustomFood;
import burgerput.project.zenput.domain.Food;
import burgerput.project.zenput.domain.Machine;
import burgerput.project.zenput.repository.foodRepository.CustomFoodRepository;
import burgerput.project.zenput.repository.foodRepository.FoodRepository;
import burgerput.project.zenput.repository.machineRepository.CustomMachineRepository;
import burgerput.project.zenput.repository.machineRepository.MachineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.min;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@Slf4j
public class AlertLoadingV1 implements AlertLoading {

    private final MachineRepository machineRepository;
    private final FoodRepository foodRepository;

    private final PrintData printData;

    @Override
    public ArrayList<Map> editMachine(Map<Integer, Food> zenputMachineData) {
        return null;
    }

    @Override
    public ArrayList<Map> editFood(Map<Integer, Food> zenputFoodData) {
        return null;
    }

    @Override
    public ArrayList addMachine(Map<Integer, Machine> zenputMachineData) {
        //Db에서 값 가져오기
        List<Machine> machineDBDatas = machineRepository.findAll();

        //Db's id store - 반복 중첩을 줄이기 위해 id를 따로 저장함
        ArrayList<Integer> dbIdStore = new ArrayList<>();
        for (Machine machineDBData : machineDBDatas) {
            dbIdStore.add(machineDBData.getId());
        }

        ArrayList addResult = new ArrayList();
        //새롭게 추가된 ADD 객체 저장소
        if (!machineDBDatas.isEmpty()) {
            //DB 데이터가 null이 아닌 경우
            for (Integer zenputMachineDatum : zenputMachineData.keySet()) {
                if (dbIdStore.contains(zenputMachineDatum)) {
                    //DB에 해당 id 값을 갖고 있는 경우
                } else {
                    Map<String, String> tempMap = new HashMap<>();
                    tempMap.put("id", Integer.toString(zenputMachineData.get(zenputMachineDatum).getId()));
                    tempMap.put("name", zenputMachineData.get(zenputMachineDatum).getName());
                    tempMap.put("min", Integer.toString(zenputMachineData.get(zenputMachineDatum).getMin()));
                    tempMap.put("max", Integer.toString(zenputMachineData.get(zenputMachineDatum).getMax()));
                    tempMap.put("code", "add");

                    addResult.add(tempMap);
                    //DB에서 해당 id 값을 갖고 있지 않은 경우
                    log.info("has diff value ={}", zenputMachineData.get(zenputMachineDatum));
                }
            }

        }else{
            //Db data is null then upload all
            Map<String, String> tempMap = new HashMap<>();
            tempMap.put("code", "all");
            addResult.add(tempMap);
        }

        return addResult;
    }

    @Override
    public ArrayList<Map> addFood(Map<Integer, Food> zenputFoodData) {
        return null;
    }

    @Override
    public ArrayList<Map> delMachine(Map<Integer, Machine> zenputMachineData) {
        return null;
    }

    @Override
    public ArrayList<Map> delFood(Map<Integer, Food> zenputFoodData) {
        return null;
    }



}
