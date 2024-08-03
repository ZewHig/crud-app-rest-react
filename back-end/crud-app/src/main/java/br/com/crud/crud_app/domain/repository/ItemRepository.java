package br.com.crud.crud_app.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.crud.crud_app.domain.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{

}
