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

import java.util.*;


@RequiredArgsConstructor
@Slf4j
public class AlertLoadingV1 implements AlertLoading {

    private final MachineRepository machineRepository;
    private final FoodRepository foodRepository;

    private final PrintData printData;

    @Override
    public ArrayList<Map> editMachine(Map<Integer, Machine> zenputMachineData) {

        //Db에서 값 가져오기
        List<Machine> machineDBDatas = machineRepository.findAll();
//        log.info("machineDbData = {}", machineDBDatas);

        //Db's id store - 반복 중첩을 줄이기 위해 id를 따로 저장함
        ArrayList<Integer> dbIdStore = new ArrayList<>();
        for (Machine machineDBData : machineDBDatas) {
            dbIdStore.add(machineDBData.getId());
        }

        ArrayList addResult = new ArrayList();
        //새롭게 추가된 Edit객체 저장소
        if (!machineDBDatas.isEmpty()) {
            //DB 데이터가 null이 아닌 경우
            //repeat pre's id list
            for (int key : dbIdStore) {
                //find db value
                Machine dbMachine = machineRepository.findMachineById(Integer.toString(key));
                Machine zenputMachine = zenputMachineData.get(key);

//                log.info("DbMachine ={}", dbMachine);
//                log.info("zenputMachie = {}", zenputMachine);
                //store for edited data
                Map<String, String> tempMap = new LinkedHashMap<>();
                //name check start
                log.info("key value  = {}", key);
                if (!(zenputMachine == null)) {
                    if (!dbMachine.getName().equals(zenputMachine.getName())) {
                        //if the name value was different?
                        ArrayList<Object> objects = new ArrayList<>();
                        objects.add(dbMachine.getName());
                        objects.add(zenputMachine.getName());

                        tempMap.put("id", Integer.toString(zenputMachine.getId()));
                        tempMap.put("name", objects.toString());
                        tempMap.put("min", Integer.toString(zenputMachine.getMin()));
                        tempMap.put("max", Integer.toString(zenputMachine.getMax()));
                        tempMap.put("code", "edit");
                        // NAME : [BEFORE, AFTER]
                    }

                    // min check Start
                    if (!((dbMachine.getMin()) == zenputMachine.getMin())) {
                        log.info("min test");
                        ArrayList<Object> objects = new ArrayList<>();
                        objects.add(dbMachine.getMin());
                        objects.add(zenputMachine.getMin());
                        // min : [BEFORE, AFTER]

                        tempMap.put("id", Integer.toString(zenputMachine.getId()));

                        if (!tempMap.containsKey("name")) {
                            tempMap.put("name", zenputMachine.getName());
                        }

                        tempMap.put("min", objects.toString());

                        if (!tempMap.containsKey("max")) {
                            tempMap.put("max", Integer.toString(zenputMachine.getMax()));
                        }

                        tempMap.put("code", "edit");

                    }
                    // max check Start
                    if (!(dbMachine.getMax() == zenputMachine.getMax())) {
                        ArrayList<Object> objects = new ArrayList<>();
                        objects.add(dbMachine.getMax());
                        objects.add(zenputMachine.getMax());
                        // max : [BEFORE, AFTER]


                        tempMap.put("id", Integer.toString(zenputMachine.getId()));

                        if (!tempMap.containsKey("name")) {
                            tempMap.put("name", zenputMachine.getName());
                        }

                        if (!tempMap.containsKey("min")) {
                            tempMap.put("min", objects.toString());
                        }

                        tempMap.put("max", objects.toString());

                        tempMap.put("code", "edit");
                    }

                    if (!tempMap.isEmpty()) {
                        addResult.add(tempMap);
                    }
                }
//                addResult.add(tempMap);
            }
        } else {
            //Db data is null then upload all
            Map<String, String> tempMap = new HashMap<>();
            tempMap.put("code", "all");
            addResult.add(tempMap);

        }
        return addResult;
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
                    tempAddMachineSetup(zenputMachineData, zenputMachineDatum, tempMap);

                    addResult.add(tempMap);
                    //DB에서 해당 id 값을 갖고 있지 않은 경우
                    log.info("has diff value ={}", zenputMachineData.get(zenputMachineDatum));
                }
            }

        } else {
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
        //Db에서 값 가져오기
        //Db에서 값 가져오기
        List<Machine> machineDBDatas = machineRepository.findAll();

        //Db's id store - 반복 중첩을 줄이기 위해 id를 따로 저장함
        ArrayList<Integer> dbIdStore = new ArrayList<>();
        for (Machine machineDBData : machineDBDatas) {
            dbIdStore.add(machineDBData.getId());
        }

        ArrayList addResult = new ArrayList();

        if (!machineDBDatas.isEmpty()) {
            //DB 데이터가 null이 아닌 경우
            //repeat pre's id list
            for (int key : dbIdStore) {
                Map<String, String> tempMap = new LinkedHashMap<>();

                //del check start
                if (zenputMachineData.get(key) == null ? true : false) {
                    log.info("key value = {}", key);
                    //true -> it's deleted (zenputPage delete the entity)
                    Machine deletedMachine = machineRepository.findMachineById(Integer.toString(key));
                    tempMap.put("id", Integer.toString(deletedMachine.getId()));
                    tempMap.put("name", deletedMachine.toString());
                    tempMap.put("min", Integer.toString(deletedMachine.getMin()));
                    tempMap.put("max", Integer.toString(deletedMachine.getMax()));
                    tempMap.put("code", "del");

                    addResult.add(tempMap);
                } else {

                }

            }
        }

        return addResult;
    }

    @Override
    public ArrayList<Map> delFood(Map<Integer, Food> zenputFoodData) {
        return null;
    }

    private static void tempAddMachineSetup(Map<Integer, Machine> zenputMachineData, Integer keyData, Map<String, String> tempMap) {
        tempMap.put("id", Integer.toString(zenputMachineData.get(keyData).getId()));
        tempMap.put("name", zenputMachineData.get(keyData).getName());
        tempMap.put("min", Integer.toString(zenputMachineData.get(keyData).getMin()));
        tempMap.put("max", Integer.toString(zenputMachineData.get(keyData).getMax()));
        tempMap.put("code", "add");
    }

}
